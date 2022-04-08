export const getWorkItemPath = (item: string): string => {
  switch (item) {
    case 'ticket_no':
      return 'id';
    case 'title':
      return '/fields/System.Title';
    case 'status':
      return '/fields/System.State';
    case 'next_update_date':
      return '/fields/Custom.NextUpdateDate';
    case 'area_path':
      return '/fields/System.AreaPath';
    case 'created_date':
      return '/fields/System.CreatedDate';
    case 'changed_date':
      return '/fields/System.ChangedDate';
    case 'forecast_delivery_date':
      return '/fields/Custom.ForecastDeliveryDate';
    case 'requested_for_date':
      return '/fields/Custom.RequestedForDate';
    case 'created_by':
      return '/fields/System.CreatedBy';
    case 'changed_by':
      return '/fields/System.ChangedBy';
    case 'assigned_to':
      return '/fields/System.AssignedTo';
    case 'hours_lost':
      return '/fields/Custom.HoursLost';
    case 'status_comments':
      return '/fields/Custom.Statuscomments';
    case 'business_contact':
      return '/fields/Custom.BusinessContact';
    case 'tags':
      return '/fields/System.Tags';
    case 'board_column':
      return '/fields/WEF_683705E9E2C24420AE06D9B50338A1B0_Kanban.Column';
    case 'priority_no':
      return '/fields/Custom.PriorityNo';
    default:
      throw new Error('Item is not supported.');
  }
}