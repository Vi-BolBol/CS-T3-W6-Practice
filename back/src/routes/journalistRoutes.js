import { Router } from 'express'
import { getAllJournalists, getJournalistById, getArticlesByJournalist } from '../controllers/journalistController.js'

const journalistRouter = Router();
journalistRouter.get('/', getAllJournalists)
journalistRouter.get('/:id', getJournalistById)
journalistRouter.get('/:id/articles', getArticlesByJournalist)

export default journalistRouter