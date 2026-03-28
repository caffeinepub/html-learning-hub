import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lesson {
    id: bigint;
    title: string;
    content: string;
    order: bigint;
    difficulty: string;
    slug: string;
    description: string;
    codeExample: string;
}
export interface backendInterface {
    getAllLessons(): Promise<Array<Lesson>>;
    getLessonBySlug(slug: string): Promise<Lesson>;
    searchLessons(keyword: string): Promise<Array<Lesson>>;
}
