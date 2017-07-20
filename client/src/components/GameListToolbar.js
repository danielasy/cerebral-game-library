import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toolbar as CoreToolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  toolbar: {
    alignItems: 'bottom',
    backgroundColor: 'transparent',
    marginBottom: '4px',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
  },
  toolbarTitle: {
    color: '#9E9E9E',
    fontSize: '16px',
    lineHeight: '24px',
    paddingTop: '7px',
    paddingRight: '8px',
  },
  dropDownLabel: {
    color: '#4FC3F7',
  },
};

class GameListToolbar extends Component {
  render() {
    return (
      <CoreToolbar style={style.toolbar}>
        <ToolbarGroup>
          <ToolbarTitle text='Ordenar por' style={style.toolbarTitle} />
          <DropDownMenu
            value={this.props.sortBy}
            onChange={this.props.handleSortByChange}
            labelStyle={style.dropDownLabel}>
            <MenuItem
              value={'title-asc'}
              primaryText='Título ⬆'
            />
            <MenuItem
              value={'title-desc'}
              primaryText='Título ⬇'
            />
            <MenuItem
              value={'rating-asc'}
              primaryText='Avaliação ⬆'
            />
            <MenuItem
              value={'rating-desc'}
              primaryText='Avaliação ⬇'
            />
            <MenuItem
              value={'release-asc'}
              primaryText='Lançamento ⬆'
            />
            <MenuItem
              value={'release-desc'}
              primaryText='Lançamento ⬇'
            />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle
            text={`Estimativa de valor da coleção: R$ ${this.props.priceEstimate}`}
            style={style.toolbarTitle}
          />
        </ToolbarGroup>
      </CoreToolbar>
    );
  }
}

GameListToolbar.propTypes = {
  priceEstimate: PropTypes.string,
  sortBy: PropTypes.string.isRequired,
  handleSortByChange: PropTypes.func.isRequired,
};

GameListToolbar.defaultProps = {
  priceEstimate: '0',
};

export default GameListToolbar;
