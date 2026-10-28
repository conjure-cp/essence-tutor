export interface LessonLookup { lessonName: string; internalName: string }

const text = (g: Record<string, unknown>) => g as Record<string, string>;
const mds    = text(import.meta.glob('./lessons/*/lesson.md',      { query: '?raw', import: 'default', eager: true }));
const starts = text(import.meta.glob('./lessons/*/start.essence',  { query: '?raw', import: 'default', eager: true }));
const sols   = text(import.meta.glob('./lessons/*/solution.essence', { query: '?raw', import: 'default', eager: true }));
const metas  = import.meta.glob('./lessons/*/meta.json', { import: 'default', eager: true }) as Record<string, { lessonName: string }>;

const idOf = (path: string) => path.split('/')[2];
const file = (content: string) => ({ files: [{ name: 'model', type: 'essence', content }] });

export async function getTutorialDirectory(_lang: string): Promise<LessonLookup[]> {
  return Object.entries(metas)
    .map(([p, m]) => ({ lessonName: m.lessonName, internalName: idOf(p) }))
    .sort((a, b) => a.internalName.localeCompare(b.internalName));
}

export async function getTutorial(_lang: string, id: string) {
  const markdown = lessonMarkdown(id);
  if (markdown === undefined) return undefined;
  const key = (name: string) => `./lessons/${id}/${name}`;
  return {
    markdown,
    lesson: file(starts[key('start.essence')] ?? ''),
    solved: file(sols[key('solved.essence')] ?? starts[key('start.essence')] ?? ''),
  };
}

const allMds = text(import.meta.glob('./lessons/*/*.md', { query: '?raw', import: 'default', eager: true }));

function lessonMarkdown(id: string): string | undefined {
  const parts = Object.keys(allMds)
    .filter((p) => idOf(p) === id)
    .sort()
    .map((p) => allMds[p]);
  return parts.length ? parts.join('\n\n') : undefined;
}

console.log('lesson files found:', Object.keys(allMds), Object.keys(metas));
