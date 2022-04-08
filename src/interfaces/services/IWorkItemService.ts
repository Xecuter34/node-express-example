import { IJsonPatchDocument } from "../IJsonPatchDocument";
import { IWorkItemSerialized } from "../IWorkItem";

export default interface IWorkItemService {
  getWorkItems(offset: number): Promise<IWorkItemSerialized[]>;
  getWorkItem(ticket_id: number): Promise<IWorkItemSerialized>;
  updateWorkItem(ticket_id: number, workItem: IWorkItemSerialized): Promise<boolean>;
  getWorkItemHistory(ticket_id: number, date?: Date): Promise<IWorkItemSerialized[]>;
}