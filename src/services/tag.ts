import { Tag } from "../models";

const TAGS_KEY = "TIME_MANAGER_TAGS";

export function addTag(tag: Tag) {
  const tagsString = localStorage.getItem(TAGS_KEY);
  if (!tagsString) {
    localStorage.setItem(TAGS_KEY, JSON.stringify([tag]));
    return;
  }
  const tags: Tag[] = JSON.parse(tagsString);
  const newtags = tags.concat([tag]);
  localStorage.setItem(TAGS_KEY, JSON.stringify(newtags));
}

export function deleteTag(tag: Tag) {
  const tagsString = localStorage.getItem(TAGS_KEY);
  if (!tagsString) {
    return;
  }
  const tags: Tag[] = JSON.parse(tagsString);
  const newtags = tags.filter((savedtag) => savedtag.id !== tag.id);
  localStorage.setItem(TAGS_KEY, JSON.stringify(newtags));
}

export function editTag(tag: Tag) {
  const tagsString = localStorage.getItem(TAGS_KEY);
  if (!tagsString) {
    return;
  }
  const tags: Tag[] = JSON.parse(tagsString);
  const newtags = tags.map((savedtag) => {
    if (savedtag.id === tag.id) {
      return tag;
    }
    return savedtag;
  });
  localStorage.setItem(TAGS_KEY, JSON.stringify(newtags));
}
