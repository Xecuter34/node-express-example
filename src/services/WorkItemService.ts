import IWorkItemService from "../interfaces/services/IWorkItemService";
import { IWorkItemSerialized, IWorkItemSerializedWithRevision } from "../interfaces/IWorkItem";
import { AzureHandler } from "../utils/AzureHandler";
import { IJsonPatchDocument } from "../interfaces/IJsonPatchDocument";
import { getWorkItemPath } from "../utils/general";

export class WorkItemService implements IWorkItemService {
  private readonly _azureHandler = new AzureHandler();

  constructor() { }

  getWorkItems = async (offset: number): Promise<IWorkItemSerialized[]> => {
    return await this._azureHandler.getWorkItems();
  }

  getWorkItem = async (ticket_id: number): Promise<IWorkItemSerialized> => {
    return await this._azureHandler.getWorkItem(ticket_id);
  }

  updateWorkItem = async (ticket_id: number, workItem: Omit<IWorkItemSerialized, 'ticket_no'>): Promise<boolean> => {
    const latestItem = await this._azureHandler.getWorkItem(ticket_id);
    const data: IJsonPatchDocument[] = Object.keys(workItem)
      .filter(w => workItem[w as keyof Omit<IWorkItemSerialized, 'ticket_no'>] !== latestItem[w as keyof Omit<IWorkItemSerialized, 'ticket_no'>])
      .map(w => ({
        op: 'replace',
        path: getWorkItemPath(w),
        value: workItem[w as keyof Omit<IWorkItemSerialized, 'ticket_no'>]
      }));
    const updatedWorkItem = await this._azureHandler.updateWorkItem(ticket_id, data);
    if (!updatedWorkItem) {
      return false;
    }
    return true;
  }

  getWorkItemHistory = async (ticket_id: number, date?: Date): Promise<IWorkItemSerializedWithRevision[]> => {
    return await this._azureHandler.getWorkItemHistory(ticket_id, date);
  }
}