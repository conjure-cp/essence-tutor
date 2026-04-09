use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

use crate::{data::content::Task, ui::components::UIComponent};

pub struct MarkdownComponent {
    task: Task
}

impl MarkdownComponent {
    pub fn new(task: Task) -> MarkdownComponent {
        MarkdownComponent { task }
    }
}

impl UIComponent for MarkdownComponent {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        Paragraph::new("markdown").render(area, buf);
    }
}
