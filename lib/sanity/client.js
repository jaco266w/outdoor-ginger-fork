import ImageUrlBuilder from "@sanity/image-url"
import { createClient } from "next-sanity"


export const client = createClient({
    projectId: "aq20tlwi",
    dataset: "production",
    apiVersion: "2024-03-11",
    useCdn: true,
})

export const forkClient = createClient({
    projectId: "aq20tlwi",
    dataset: "fork",
    apiVersion: "2024-03-11",
    useCdn: true,
})

const builder = ImageUrlBuilder(client)

const forkBuilder = ImageUrlBuilder(forkClient)

export function urlFor(source) {
    return builder.image(source)
}

export function forkUrlFor(source) {
    return forkBuilder.image(source)
}

