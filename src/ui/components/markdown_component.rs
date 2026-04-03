use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

use crate::ui::components::UIComponent;

pub struct MarkdownWidget {}

impl UIComponent for MarkdownWidget {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        Paragraph::new("markdown").render(area, buf);
    }
}
