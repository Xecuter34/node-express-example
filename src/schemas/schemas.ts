import { IJsonPatchDocument } from '../interfaces/IJsonPatchDocument';
import * as yup from 'yup';

export const userSchema = yup.object({
  offset: yup.string().required(),
  query: yup.string().notRequired()
});

export const workItemAllSchema = yup.object({
  offset: yup.string().required()
});

export const workItemSchema = yup.object({
  id: yup.number().required()
});

export const workItemDataSchema = yup.array<IJsonPatchDocument>(
  yup.object({
    value: yup.string(),
    op: yup.string().oneOf(['add', 'copy', 'move', 'remove', 'replace', 'test']),
    path: yup.string(),
    from: yup.string()
  })
);

export const workItemRequestSchema = yup.object({
  created_by: yup.string().notRequired(),
  title: yup.string().notRequired(),
  status: yup.string().required(),
  next_update_date: yup.date().required(),
  area_path: yup.string().required(),
  created_date: yup.date().required(),
  changed_date: yup.date().required(),
  forecast_delivery_date: yup.date().required(),
  requested_for_date: yup.date().required(),
  changed_by: yup.string().required(),
  assigned_to: yup.string().required(),
  hours_lost: yup.number().required(),
  status_comments: yup.string().required(),
  board_column: yup.string().notRequired(), 
  business_contact: yup.string().notRequired(), 
  tags: yup.string().notRequired(), 
  priority_no: yup.string().notRequired()
});

export const workItemDateSchema = yup.object({
  changedBy: yup.date()
});