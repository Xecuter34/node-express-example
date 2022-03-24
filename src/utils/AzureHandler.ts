import axios, { AxiosResponse } from 'axios';
import { IJsonPatchDocument } from '../interfaces/IJsonPatchDocument';
import { IWorkItemBasic, IWorkItem, IWorkItemSerialized } from '../interfaces/IWorkItem';

export class AzureHandler {
  private readonly _baseUrl = `https://dev.azure.com/${process.env.AZURE_ORGANISATION}/${process.env.AZURE_PROJECT}/_apis`;
  private readonly _version = `?api-version=${process.env.AZURE_API_VERSION}`;

  constructor() { 
    // this._baseUrl = `https://dev.azure.com/${process.env.AZURE_ORGANISATION}/${process.env.AZURE_PROJECT}/_apis[ROUTE]?api-version=${process.env.AZURE_API_VERSION}`;
  }

  private getItems = async (): Promise<AxiosResponse<any, any>> => {
    return await axios.post(`${this._baseUrl}/wit/wiql${this._version}`, {
      query: "Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.WorkItemType] = 'User Story' AND [System.AreaPath] <> 'Digital Transformation'"
    },
    {
      headers: {
        'content-type': 'application/json'
      },
      auth: {
        username: '',
        password: process.env.AZURE_TOKEN
      }
    });
  }

  private serializeResponse = (workItems: IWorkItem) => {
    return {
      ticket_no: workItems.id.toString(),
      title: workItems.fields['System.Title'],
      status: workItems.fields['System.State'],
      next_update_date: workItems.fields['Custom.NextUpdateDate'] ?? new Date(),
      area_path: workItems.fields['System.AreaPath'],
      created_date: workItems.fields['System.CreatedDate'],
      changed_date: workItems.fields['System.ChangedDate'],
      forecast_delivery_date: workItems.fields['Custom.ForecastDeliveryDate'] ?? new Date(),
      requested_for_date: workItems.fields['Custom.RequestedForDate'] ?? new Date(),
      created_by: workItems.fields['System.CreatedBy'] ? workItems.fields['System.CreatedBy'].displayName : '',
      changed_by: workItems.fields['System.ChangedBy'] ? workItems.fields['System.ChangedBy'].displayName : '',
      assigned_to: workItems.fields['System.AssignedTo'] ? workItems.fields['System.AssignedTo'].displayName : '',
      hours_lost: workItems.fields['Custom.HoursLost'] ?? 0,
      status_comments: workItems.fields['Custom.Statuscomments'] ? workItems.fields['Custom.Statuscomments'].replace(/<\[\^>\]\+>/g, '') : '',
      business_contact: workItems.fields['Custom.BusinessContact'],
      tags: workItems.fields['System.Tags'],
      board_column: workItems.fields['System.BoardColumn'],
      priority_no: workItems.fields['Custom.PriorityNo']
    }
  }

  getWorkItems = async (): Promise<IWorkItemSerialized[]> => {
    const response = await this.getItems();
    const workItems = await Promise.all<IWorkItem[]>(response.data['workItems'].map(async (item: IWorkItemBasic) => {
      return await axios.get(item.url, { auth: { username: '', password: process.env.AZURE_TOKEN }});
    }));
    return workItems
      .filter((x: any) => x.data.fields['System.State'] === 'Active' || x.data.fields['System.State'] === 'New')
      .map<IWorkItemSerialized>((x: any) => {
        const item: IWorkItem = x.data;
        if (item.fields['System.State'] === 'Active' || item.fields['System.State'] === 'New') {
          return this.serializeResponse(item);
        }
      });
  }

  getWorkItem = async (id: number): Promise<IWorkItemSerialized> => {
    const response = await this.getItems();
    const workItem = response.data['workItems'].find((x: IWorkItemBasic) => x.id === id);
    const item = (await axios.get<IWorkItem>(workItem.url, { auth: { username: '', password: process.env.AZURE_TOKEN }})).data;
    return this.serializeResponse(item);
  }
  
  updateWorkItem = async (id: number, data: IJsonPatchDocument[]): Promise<IWorkItemSerialized> => {
    const updatedWorkItem = await axios.patch<IWorkItem>(`${this._baseUrl}/wit/workitems/${id}${this._version}`, data, { 
      headers: {
        'content-type': 'application/json-patch+json'
      },
      auth: { 
        username: '', 
        password: process.env.AZURE_TOKEN 
      }
    });
    return this.serializeResponse(updatedWorkItem.data);
  }
}