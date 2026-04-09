use ratatui::{buffer::Buffer, layout::{Constraint, Direction, Layout, Rect}, style::Style, widgets::{Block, BlockExt, LineGauge, Row, Table, Widget}};

use crate::{data::state::State, ui::{components::UIComponent}};

pub struct SidebarComponent<'a> {
    block: Option<Block<'a>>,
    state: &'a mut State,
}

impl<'a> SidebarComponent<'a> {
    pub fn new(state: &'a mut State) -> SidebarComponent<'a> {
        SidebarComponent {
            block: None,
            state,
        }
    }

    pub fn block(mut self, block: Block<'a>) -> Self {
        self.block = Some(block);
        self
    }
}

impl UIComponent for SidebarComponent<'_> {
    fn render(&self, area: Rect, buf: &mut Buffer) {
        self.block.as_ref().render(area, buf);
        let layout = Layout::default()
            .direction(Direction::Vertical)
            .constraints(vec![
                Constraint::Length(2),
                Constraint::Fill(1),
            ])
            .horizontal_margin(1)
            .spacing(1)
            .split(self.block.inner_if_some(area));
      
        let ratio: f64 = self.state.get_complete_chapter_count() as f64 / self.state.get_chapter_count() as f64;
        LineGauge::default()
            .block(Block::new().title("Progress"))
            .filled_style(Style::new().green().on_black())
            .filled_symbol("⬛︎")
            .label(format!("{}/{}", self.state.get_complete_chapter_count(), self.state.get_chapter_count()))
            .ratio(ratio)
            .render(layout[0], buf);

        let rows = self.state.chapters.iter()
            .map(|c| Row::new(vec![format!("{:02}", c.get_number()), format!("{}", c.get_state()), c.get_title().to_string()]));

        Table::new(rows, [Constraint::Length(2), Constraint::Length(2), Constraint::Fill(1)])
            .block(Block::new().title("Chapters"))
            .column_spacing(1)
            .cell_highlight_style(Style::new().blue())
            .highlight_symbol(">>")
            .render(layout[1], buf);
    }
}
