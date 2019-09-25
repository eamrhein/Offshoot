import * as PanelAPIutil from '../util/panel_util';
export const RECEIVE_PANEL = 'RECEIVE_PANEL';
export const RECEIVE_PANELS = 'RECEIVE_PANELS';

const receivePanel = panel => ({
  type: RECEIVE_PANEL,
  panel
});

const receivePanels = panels => ({
  type: RECEIVE_PANELS,
  panels
});

export const createPanel = panel => dispatch => (
  PanelAPIutil.createPanel(panel)
    .then(panel => dispatch(receivePanel(panel)))
);

export const fetchPanel = id => dispatch => (
  PanelAPIutil.fetchPanel(id)
    .then(panel => dispatch(receivePanel(panel)))
)

export const fetchPanels = () => dispatch => (
  console.log('Panels are being fetched')
)