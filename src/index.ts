import dotenv from 'dotenv';
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { ValidationError } from 'yup';
import { IJsonPatchDocument } from './interfaces/IJsonPatchDocument';
import { IWorkItemSerialized } from './interfaces/IWorkItem';
import { workItemAllSchema, workItemSchema, userSchema, workItemRequestSchema, workItemDateSchema } from './schemas/schemas';
import { WorkItemService } from './services/WorkItemService'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = 8080;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Azure DevOps API',
      version: '1.0.0'
    }
  },
  apis: ['./docs/**/*.yaml'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());

app.get( '/users', async (req, res) => {
  try {
    const query = await userSchema.validate(req.query);
    throw new Error('Route not yet implemented.');
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    };
    return res.status(500).json({ error: err.message });
  }
});

app.get('/work-items', async (req, res) => {
  try {
    const query = await workItemAllSchema.validate(req.query);
    const workItemService = new WorkItemService();
    res.json(await workItemService.getWorkItems(parseInt(query.offset)));
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    };
    return res.status(500).json({ error: err.message });
  }
});

app.get('/work-items/:id', async (req, res) => {
  try {
    const params = await workItemSchema.validate(req.params);
    const workItemService = new WorkItemService();
    res.json(await workItemService.getWorkItem(params.id)) 
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    };
    return res.status(500).json({ error: err.message });
  }
});

app.patch('/work-items/:id', async (req, res) => {
  try {
    const params = await workItemSchema.validate(req.params);
    const body: Omit<IWorkItemSerialized, 'ticket_no'> = await workItemRequestSchema.validate(req.body);
    const workItemService = new WorkItemService();
    res.json({ status: await workItemService.updateWorkItem(params.id, body) });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    };
    return res.status(500).json({ status: false });
  }
});

app.get('/work-items/:id/history', async (req, res) => {
  try {
    const params = await workItemSchema.validate(req.params);
    const query = await workItemDateSchema.validate(req.query);
    const workItemService = new WorkItemService();
    res.json(await workItemService.getWorkItemHistory(params.id, query.changedBy));
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    };
    return res.status(500).json({ status: false });
  }
});

app.listen( port, () => {
  console.log(`server started at http://localhost:${port}`);
});