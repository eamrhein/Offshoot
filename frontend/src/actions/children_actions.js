import * as PanelAPIutil from '../util/panel_util'

export const RECEIVE_CHILDREN = 'RECEIVE_CHILDREN';
export const CLEAR_CHILDREN = 'CLEAR_CHILDREN';
const receiveChildren = (panels) => ({
  type: RECEIVE_CHILDREN,
  panels
});

const clearChildren = () => ({
  type: CLEAR_CHILDREN
})


export const clearChildState = () => dispatch => (
  dispatch(clearChildren())
)

export const fetchChildren = (optionalArg) => dispatch => (
  PanelAPIutil.fetchChildren(optionalArg)
    .then(panels => dispatch(receiveChildren(panels)))
)