use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

use crate::ui::components::UIComponent;

pub struct MarkdownComponent {}

impl UIComponent for MarkdownComponent {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        Paragraph::new("markdown").render(area, buf);
    }
}
