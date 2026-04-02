use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

pub struct MarkdownWidget {}

impl Widget for MarkdownWidget {
    fn render(self, area: Rect, buf: &mut Buffer)
        where
            Self: Sized {
        Widget::render(&self, area, buf);
    }
}

impl Widget for &MarkdownWidget {
    fn render(self, area: Rect, buf: &mut Buffer)
        where
            Self: Sized {
        Paragraph::new("markdown").render(area, buf);
    }
}
