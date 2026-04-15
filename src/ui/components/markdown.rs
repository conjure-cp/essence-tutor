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
            scrollbar: ScrollbarState::new(0),
            content: fs::read_to_string(task.get_path()).unwrap_or("Failed to load file!".to_string()),
            task,
        }
    }
}

impl UIComponent for MarkdownComponent {
    fn render(&mut self, area: Rect, buf: &mut Buffer) {
        let lines: Vec<Line> = self.content.split("\n")
            .flat_map(|l| {
                if l.len() > area.width as usize {
                    vec![Line::from(&l[..area.width as usize]), Line::from(&l[area.width as usize..])]
                } else {
                    vec![Line::from(l)]
                }
            })
            .collect();

        if lines.len() > area.height as usize {
            self.scrollbar = self.scrollbar.content_length(lines.len() - area.height as usize)
        }

        Scrollbar::new(ScrollbarOrientation::VerticalRight)
            .render(area.inner(Margin { vertical: 0, horizontal: 1 }), buf, &mut self.scrollbar);

        Paragraph::new(Text::from(lines))
            .scroll((self.scrollbar.get_position() as u16, 0))
            .block(Block::new().padding(Padding { left: 0, right: 4, top: 0, bottom: 0 }))
            .render(area, buf);
    }
}
