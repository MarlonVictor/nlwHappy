import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';

export default {
    async index(req: Request, res: Response) {
        const orpahagesRepository = getRepository(Orphanage)
        const orphanages = await orpahagesRepository.find({
            relations: ['images']
        })

        return res.json(orphanageView.rendeMany(orphanages))
    },

    async show(req: Request, res: Response) {
        const { id } = req.params
        const orpahagesRepository = getRepository(Orphanage)

        const orphanage = await orpahagesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanageView.render(orphanage))
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body
    
        const orpahagesRepository = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[]

        const images = requestImages.map(img => {
            return { path: img.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == "true" ? true : false,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))
        })

        await schema.validate(data, {
            abortEarly: false
        })
    
        const orphanage = orpahagesRepository.create(data)
    
        await orpahagesRepository.save(orphanage)
    
        return res.json(orphanage)
    }
}