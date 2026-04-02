use ratatui::{buffer::Buffer, layout::Rect, widgets::{Paragraph, Widget}};

pub struct RunnerWidget {}

impl Widget for RunnerWidget {
    fn render(self, area: Rect, buf: &mut Buffer)
        where
            Self: Sized {
        Widget::render(&self, area, buf);
    }
}

impl Widget for &RunnerWidget {
    fn render(self, area: Rect, buf: &mut Buffer)
        where
            Self: Sized {
        Paragraph::new("runner").render(area, buf);
    }
}
