export interface LessonLookup { lessonName: string; internalName: string }

const text = (g: Record<string, unknown>) => g as Record<string, string>;
const mds    = text(import.meta.glob('./lessons/*/lesson.md',      { query: '?raw', import: 'default', eager: true }));
const starts = text(import.meta.glob('./lessons/*/start.essence',  { query: '?raw', import: 'default', eager: true }));
const sols   = text(import.meta.glob('./lessons/*/solved.essence', { query: '?raw', import: 'default', eager: true }));
const metas  = import.meta.glob('./lessons/*/meta.json', { import: 'default', eager: true }) as Record<string, { lessonName: string }>;

const idOf = (path: string) => path.split('/')[2];
const file = (content: string) => ({ files: [{ name: 'model', type: 'essence', content }] });

export async function getTutorialDirectory(_lang: string): Promise<LessonLookup[]> {
  return Object.entries(metas)
    .map(([p, m]) => ({ lessonName: m.lessonName, internalName: idOf(p) }))
    .sort((a, b) => a.internalName.localeCompare(b.internalName));
}

export async function getTutorial(_lang: string, id: string) {
  const key = (name: string) => `./lessons/${id}/${name}`;
  if (!mds[key('lesson.md')]) return undefined;
  return {
    markdown: mds[key('lesson.md')],
    lesson: file(starts[key('start.essence')] ?? ''),
    solved: file(sols[key('solved.essence')] ?? ''),
  };
}