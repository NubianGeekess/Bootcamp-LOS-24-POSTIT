
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import authUser from '../helpers/authUser';
import { onLogoutUser, onLoadGroups } from '../../actions';
import { ListItem, IconButton } from './';
/**
 * SideMenu component
 * Shows a side menu navigation on the dashboard
 *
 * @class SideMenu
 *
 * @extends {React.Component}
 */
export class SideMenu extends React.Component {
	/**
	 * Creates an instance of SideMenu.
	 * @param {any} props
	 * @memberof SideMenu
	 */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
    };
  }
	/**
	 * @returns {void}
   * @memberof SideMenu
   * */
  componentWillMount() {
    if (authUser() === false) {
      return this.props.onLogoutUser();
    }
    this.props.onLoadGroups();
  }
	/**
	 * @returns {void}
   * @memberof SideMenu
   *
	 */
  componentDidMount() {
    this.setState({
      username: authUser().username,
      email: authUser().email
    });
    $('.tooltipped').tooltip({ delay: 50 });
    $('.collapsible').collapsible();
    $('.dropdown-button').dropdown({
      constrainWidth: true,
    });
    $('.button-collapse').sideNav({
      menuWidth: 300,
      closeOnClick: true,
      edge: 'right'
    });
  }
	/**
	 * @returns {jsx} jsx component for side menu
	 * @memberof SideMenu
	 */
  render() {
    const { active, toggle, groups } = this.props;
		// const { email, username } = this.props.user;
    const { email, username } = this.state;
    return (
			<div className="dashboard-menu">
				<section className="my-tab">
					<h5><i className="fa fa-circle">
					</i>&nbsp;&nbsp;{username}
					</h5>
					<h6>{email}</h6>
				</section>
				<ul className="menu-nav">
					<ListItem
						listClass="dashboard-menu-item"
						anchorClass={active === 'dashboard' ? 'active' : ''}
						iconClass="fa fa-home side-icon"
						url="#dashboard"
						name="My Space"
					/>
					<ListItem
						listClass="dashboard-menu-item"
						anchorClass={active === 'groups' ? 'active' : ''}
						iconClass={toggle}
						url="#groups"
						name="Groups Control"
					/>
					<ListItem
						listClass="dashboard-menu-item"
						anchorClass={active === 'search-wiki' ? 'active' : ''}
						iconClass="fa fa-wikipedia-w side-icon"
						url="#search-wiki"
						name="Search Wikipedia"
					/>
					<ul className="collapsible active-group" data-collapsible="accordion">
						<li>
							<div className="collapsible-header">
								<i className="fa fa-plug"></i>
								Active Groups
							</div>
							{
								groups.length > 0 ?
									groups.map(group =>
										<div className="collapsible-body" key={group.id}>
											<a href={`#groups/${group.groupname}`}>
												<i className="fa fa-folder"></i>
												&nbsp;&nbsp;{group.groupname}
											</a>
										</div>
									) :
									<div className="collapsible-body"><span>None</span></div>
							}
						</li>
					</ul>
				</ul>
				<section className="utility">
					<a className="dropdown-button" data-activates='more-menu'>
						<i className="fa fa-gear"></i>
					</a>&nbsp;&nbsp;&nbsp;&nbsp;
						<ul id='more-menu' className='dropdown-content'>
						<li><a href="#groups">Groups Control</a></li>
						<li className="divider"></li>
						<li>
							<a id="logout" onClick={this.props.onLogoutUser}>Logout</a>
						</li>
					</ul>
				</section>
			</div>
    );
  }
}

SideMenu.defaultProps = {
  active: '',
  user: {},
  toggle: '',
  onLoadGroups: () => { },
  onLogoutUser: () => { }
};
SideMenu.propTypes = {
  active: PropTypes.string.isRequired,
  toggle: PropTypes.string.isRequired,
  back: PropTypes.object
};

const mapDispatchToProps = dispatch =>
	bindActionCreators({ onLogoutUser, onLoadGroups }, dispatch);

const mapStateToProps = state => ({
  groups: state.groups.groups
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);

