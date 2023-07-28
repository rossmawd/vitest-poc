import { rest } from 'msw'

export type DetailsPostResponse = { message: string }
export const detailsPostResponse: DetailsPostResponse = { message: 'Success' }

export const handlers = [
  rest.post('http://localhost:4000/api/details', (req, res, ctx) => {
    return res(ctx.json(detailsPostResponse))
  }),
]
