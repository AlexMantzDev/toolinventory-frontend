export interface Tool {
    id: string,
    code: string,
    name: string,
    status: string,
    type: string,
    parentId: string | null,
    location: string | null,
    createdAt: Date,
    updatedAt: Date
}