use std::fs;

use ratatui::{buffer::Buffer, layout::{Margin, Rect}, widgets::{Paragraph, Scrollbar, ScrollbarOrientation, ScrollbarState, StatefulWidget, Widget, Wrap}};

use crate::{data::content::Task, ui::components::UIComponent};

pub struct MarkdownComponent {
    task: Task,
    content: String,
    scrollbar: Option<ScrollbarState>
}

impl MarkdownComponent {
    pub fn new(task: Task) -> MarkdownComponent {
        MarkdownComponent { 
            content: fs::read_to_string(task.get_path()).unwrap_or("failed to get string".to_string()),
            task,
            scrollbar: Some(ScrollbarState::new(100)),
        }
    }
}

impl UIComponent for MarkdownComponent {
    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        let paragraph = Paragraph::new(self.content.clone())
            .wrap(Wrap { trim: false });

        if let Some(scrollbar) = &mut self.scrollbar {
            Scrollbar::new(ScrollbarOrientation::VerticalRight)
                .render(
                    area.inner(
                        Margin {
                            vertical: 0,
                            horizontal: 1,
                        }
                    ),
                    buf,
                    scrollbar,
                );
            paragraph
                .scroll((scrollbar.get_position() as u16, 0))
                .render(area, buf);
        } else {
            paragraph.render(area, buf);
        }
    }
}
