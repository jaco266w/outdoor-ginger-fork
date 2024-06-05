import ImageUrlBuilder from "@sanity/image-url"
import { createClient } from "next-sanity"


export const client = createClient({
    projectId: "aq20tlwi",
    dataset: "fork",
    apiVersion: "2024-03-11",
    useCdn: true,
})

const builder = ImageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source)
}

