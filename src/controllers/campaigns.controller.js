import * as campaignsService from "../services/campaigns.service.js"
import {getProps} from "../utils/props.js";
import slugify from "slugify";
import {deleteFile} from "../utils/files.js";

export const getCampaigns = async (req, res) => {
    try {
        let pagination = {
            limit: -1,
            skip: -1
        }
        let sort = []

        if ((!req.query.limit && req.query.skip) ||
            (req.query.limit && !req.query.skip))
            return res.status(422).json({
                message: "Please fill in the two fields \"skip\" and \"limit\"."
            })
        else if (req.query.limit != null && req.query.skip != null) {
            pagination.limit = parseInt(req.query.limit)
            pagination.skip = parseInt(req.query.skip)
        }

        if (req.query.sortBy != null) {
            let obj = {}

            obj[req.query.sortBy] = req.query.orderBy || 'asc'
            sort.push(obj)
        }

        const filters = getProps(req.query, "name")

        return res.status(200).json(await campaignsService.getCampaigns(pagination, filters, sort))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const getCampaign = async (req, res) => {
    try {
        if (req.query.type === "slug") {
            if (!await campaignsService.getCampaignBySlug(req.params.id))
                return res.status(404).json({
                    message: `No campaign found with slug ${req.params.id}.`
                })

            return res.status(200).json(await campaignsService.getCampaignBySlug(req.params.id))
        } else {
            if (!await campaignsService.getCampaign(req.params.id))
                return res.status(404).json({
                    message: `No campaign found with id ${req.params.id}.`
                })

            return res.status(200).json(await campaignsService.getCampaign(req.params.id))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const createCampaign = async (req, res) => {
    try {
        if (!req.body.name ||
            !req.body.summary ||
            !req.file)
            return res.status(422).json({
                message: "Mandatory fields are missing."
            })

        const slug = slugify(req.body.name, {lower: true})

        if (await campaignsService.getCampaignBySlug(slug))
            return res.status(409).json({
                message: `Campaign ${req.body.name} already exists.`
            })

        const data = getProps(req.body, 'name', 'summary')
        data.image = req.file.path
        data.slug = slug

        return res.status(201).json(await campaignsService.createCampaign(data))
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message
        })
    }
}

export const updateCampaign = async (req, res) => {
    try {
        let campaign = {}

        if (req.query.type === "slug") {
            campaign = await campaignsService.getCampaignBySlug(req.params.id)

            if (!campaign)
                return res.status(404).json({
                    message: `No campaign found with slug ${req.params.id}.`
                })

            const data = getProps(req.body, 'name', 'summary')

            if (req.body.name != null) {
                const slug = slugify(req.body.name, {lower: true})

                if (await campaignsService.getCampaignBySlug(slug))
                    return res.status(409).json({
                        message: `Campaign ${req.body.name} already exists.`
                    })

                data.slug = slug
            }

            if (req.file != null) {
                deleteFile(campaign.image)
                data.image = req.file.path
            }

            return res.status(200).json(await campaignsService.updateCampaignBySlug(req.params.id, data))
        } else {
            campaign = await campaignsService.getCampaign(req.params.id)
            if (!campaign)
                return res.status(404).json({
                    message: `No campaign found with id ${req.params.id}.`
                })

            campaign = await campaignsService.getCampaign(req.params.id)

            const data = getProps(req.body, 'name', 'summary')

            if (req.body.name != null) {
                const slug = slugify(req.body.name, {lower: true})

                if (await campaignsService.getCampaignBySlug(slug))
                    return res.status(409).json({
                        message: `Campaign ${req.body.name} already exists.`
                    })

                data.slug = slug
            }

            if (req.file != null) {
                deleteFile(campaign.image)
                data.image = req.file.path
            }

            return res.status(200).json(await campaignsService.updateCampaign(req.params.id, data))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}

export const deleteCampaign = async (req, res) => {
    try {
        let campaign = {}
        if (req.query.type === "slug") {
            campaign = await campaignsService.getCampaignBySlug(req.params.id)

            if (!campaign)
                return res.status(404).json({
                    message: `No campaign found with slug ${req.params.id}.`
                })

            return res.status(200).json(await campaignsService.deleteCampaignBySlug(req.params.id))
        } else {
            campaign = await campaignsService.getCampaign(req.params.id)

            if (!campaign)
                return res.status(404).json({
                    message: `No campaign found with id ${req.params.id}.`
                })

            return res.status(200).json(await campaignsService.deleteCampaign(req.params.id))
        }
    } catch (e) {
        console.error(e)

        return res.status(500).json({
            message: e.message,
        })
    }
}