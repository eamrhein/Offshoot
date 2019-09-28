import * as PanelAPIutil from '../util/panel_util';
export const RECEIVE_PANEL = 'RECEIVE_PANEL';
export const RECEIVE_PANELS = 'RECEIVE_PANELS';
export const REMOVE_PANELS = 'REMOVE_PANELS';

const receivePanel = panel => ({
  type: RECEIVE_PANEL,
  panel
});

const receivePanels = panels => ({
  type: RECEIVE_PANELS,
  panels
});

const removePanels = () => ({
  type: REMOVE_PANELS
})

export const clearPanelState = () => dispatch => (
  dispatch(removePanels())
)

export const createPanel = panel => dispatch => (
  PanelAPIutil.createPanel(panel)
    .then(panel => dispatch(receivePanel(panel),(err) => console.log('hey here are errors', err)))
);

export const fetchPanel = id => dispatch => (
  PanelAPIutil.fetchPanel(id)
    .then(panel => dispatch(receivePanel(panel)))
);

export const fetchPanels = (optionalArg) => dispatch => (
  PanelAPIutil.fetchPanels(optionalArg)
    .then(panels => dispatch(receivePanels(panels)))
);

export const updatePanel = (panel) => dispatch => (
  PanelAPIutil.updatePanel(panel)
    .then(panel => dispatch(receivePanel(panel)))
);