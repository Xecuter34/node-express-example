export interface IWorkItemBasic {
  id: number;
  url: string;
}

export interface IWorkItem {
  id: number;
  rev: number;
  fields: {
    'System.AreaPath': string;
    'System.TeamProject': string;
    'System.IterationPath': string;
    'System.WorkItemType': string;
		'System.State'?: string;
		'System.Reason': string;
		'System.AssignedTo': {
			displayName: string;
			url: string;
			_links: {
				avatar: {
					href: string;
				}
			},
			id: string;
			uniqueName: string;
			imageUrl: string;
			descriptor: string;
		},
		'System.CreatedDate': Date;
		'System.CreatedBy': {
			displayName: string;
			url: string;
			_links: {
				avatar: {
					href: string;
				}
			},
			id: string;
			uniqueName: string;
			imageUrl: string;
			inactive: boolean;
			descriptor: string;
		},
		'System.ChangedDate': Date;
		'System.ChangedBy': {
			displayName: string;
			url: string;
			_links: {
				avatar: {
					href: string;
				}
			},
			id: string;
			uniqueName: string;
			imageUrl: string;
			descriptor: string;
		},
		'System.CommentCount': number;
		'System.Title': string;
		'System.BoardColumn': string;
		'System.BoardColumnDone': boolean;
		'Microsoft.VSTS.Common.StateChangeDate': Date;
		'Microsoft.VSTS.Common.ActivatedDate': Date;
		'Microsoft.VSTS.Common.ActivatedBy': {
			displayName: string;
			url: string;
			_links: {
				avatar: {
					href: string;
				}
			},
			id: string;
			uniqueName: string;
			imageUrl: string;
			inactive: boolean;
			descriptor: string;
		},
		'Microsoft.VSTS.Common.ResolvedDate': Date;
		'Microsoft.VSTS.Common.ResolvedBy': {
			displayName: string;
			url: string;
			_links: {
				avatar: {
					href: string;
				}
			},
			id: string;
			uniqueName: string;
			imageUrl: string;
			inactive: boolean;
			descriptor: string;
		},
		'Microsoft.VSTS.Common.ClosedDate': Date;
		'Microsoft.VSTS.Common.ClosedBy': {
			displayName: string;
			url: string;
			_links: {
				avatar: {
					href: string;
				}
			},
			id: string;
			uniqueName: string;
			imageUrl: string;
			inactive: boolean;
			descriptor: string;
		},
		'Microsoft.VSTS.Common.Priority': number;
		'Microsoft.VSTS.Common.StackRank': number;
		'Microsoft.VSTS.Common.ValueArea': string;
		'Custom.BusinessContact'?: string;
		'WEF_7751C88B876347CE9996BA7AB6F409C6_Kanban.Column': string;
		'WEF_7751C88B876347CE9996BA7AB6F409C6_Kanban.Column.Done': boolean;
		'System.Description': string;
		'Microsoft.VSTS.Common.AcceptanceCriteria': string;
		'Custom.Statuscomments'?: string;
		'Custom.NextUpdateAt'?: Date;
		'Custom.ForecastDeliveryDate'?: Date;
		'Custom.RequestedForDate'?: Date;
		'Custom.HoursLost'?: number;
		'System.Tags'?: string;
		'Custom.PriorityNo'?: string;
		'Custom.NextUpdateDate'?: Date;
  },
  _links: {
		self: {
		  href: string;
		},
		workItemUpdates: {
			href: string;
		},
		workItemRevisions: {
			href: string;
		},
		workItemComments: {
			href: string;
		},
		html: {
			href: string;
		},
		workItemType: {
			href: string;
		},
		fields: {
			href: string;
		}
	},
	url: string;
}

export interface IWorkItemSerialized {
	ticket_no: string;
	created_date: Date;
	created_by: string;
	title: string;
	hours_lost: number;
	status: string;
	assigned_to: string;
	status_comments: string;
	next_update_date: Date;
	changed_date: Date;
	changed_by: string;
	forecast_delivery_date: Date;
	requested_for_date: Date;
	board_column: string;
	business_contact: string;
	tags: string;
	priority_no: string;
	area_path: string;
}

export interface IWorkItemSerializedWithRevision extends IWorkItemSerialized {
	rev: number;
}