use std::fs;

use ratatui::{buffer::Buffer, layout::{Margin, Rect}, text::{Line, Text}, widgets::{Block, Padding, Paragraph, Scrollbar, ScrollbarOrientation, ScrollbarState, StatefulWidget, Widget, Wrap}};

use crate::{data::content::Task, ui::components::UIComponent};

pub struct MarkdownComponent {
    task: Task,
    content: String,
    scrollbar: ScrollbarState
}

impl MarkdownComponent {
    pub fn new(task: Task) -> MarkdownComponent {
        MarkdownComponent { 
            scrollbar: ScrollbarState::new(1),
            content: fs::read_to_string(task.get_path()).unwrap_or("Failed to load file!".to_string()),
            task,
        }
    }
}

impl UIComponent for MarkdownComponent {
    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        if self.content.lines().count() > area.height as usize {
            self.scrollbar = self.scrollbar.content_length(self.content.lines().count() - area.height as usize)
        }

        Scrollbar::new(ScrollbarOrientation::VerticalRight)
            .render(area.inner(Margin { vertical: 0, horizontal: 1 }), buf, &mut self.scrollbar);

        Paragraph::new(self.content.clone())
            .scroll((self.scrollbar.get_position() as u16, 0))
            .block(Block::new().padding(Padding { left: 0, right: 4, top: 0, bottom: 0 }))
            .render(area, buf);
    }
}
