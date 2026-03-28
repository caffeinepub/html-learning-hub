import { useQuery } from "@tanstack/react-query";
import type { Lesson } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllLessons() {
  const { actor, isFetching } = useActor();
  return useQuery<Lesson[]>({
    queryKey: ["lessons"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllLessons();
      return result.sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLessonBySlug(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Lesson | null>({
    queryKey: ["lesson", slug],
    queryFn: async () => {
      if (!actor || !slug) return null;
      return actor.getLessonBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useSearchLessons(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Lesson[]>({
    queryKey: ["lessons", "search", keyword],
    queryFn: async () => {
      if (!actor) return [];
      if (!keyword.trim()) return [];
      return actor.searchLessons(keyword);
    },
    enabled: !!actor && !isFetching && !!keyword.trim(),
  });
}
