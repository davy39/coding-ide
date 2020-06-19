import React from "react";
import PropTypes from "prop-types";
import Menu from '../menu/Menu.js';
import { LanguageSwitcher } from '../language/LanguageSwitcher.js';
import { languages } from "monaco-editor";
import { Icon } from "@breathecode/ui-components";
import "./sidebar.css";
 
export default class Sidebar extends React.Component {
    constructor(){
        super();
        this.state = {
            open: false
        };
    }
    render(){
        const { className, children, current, next, previous, disabled, onClick, onLanguageClick, exercises, onOpen, defaultTranslation } = this.props;

        return (<div className={className}>
            <div className={`prev-next-bar`}>
                {<button onClick={e => {
                    this.setState({ open: !this.state.open });
                    if(onOpen) onOpen(!this.state.open);
                }} className="btn text-white btn-sm"><i className="fas fa-bars"></i></button>}
                <LanguageSwitcher 
                    current={defaultTranslation} 
                    translations={current ? [defaultTranslation].concat(current.translations.filter(t => t !== defaultTranslation)): ['us']} 
                    onClick={(lang) => {
                        onLanguageClick && onLanguageClick(lang);
                    }}
                />
                <a href="https://github.com/learnpack/learnpack/issues/new" className="bug" target="_blank" rel="noopener noreferrer" data-toggle="tooltip" data-placement="bottom" title="Report a bug"><Icon type="bug" size="17px" className="text-primary ml-1 " /></a>
                {next && 
                    <button className="next-exercise btn btn-dark btn-sm" disabled={disabled} onClick={() => {
                        this.setState({ open: false });
                        onClick(next.slug);
                    }}>
                        Next <i className="fas fa-arrow-right"></i> 
                    </button>
                }
                {previous && 
                    <button className="prev-exercise btn btn-dark btn-sm mr-2" disabled={disabled} onClick={() => {
                        this.setState({ open: false });
                        onClick(previous.slug);
                    }}>
                        <i className="fas fa-arrow-left"></i> Previous
                    </button>
                }
            </div>
            <Menu className={`${this.state.open ? "open":""}`} exercises={exercises} onClick={ex => {
                this.setState({ open: false });
                onClick(ex.slug);
            }} />
            {children}
        </div>);
    }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  defaultTranslation: PropTypes.string,
  previous: PropTypes.object,
  next: PropTypes.object,
  current: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onLanguageClick: PropTypes.func,
  onClick: PropTypes.func,
  onOpen: PropTypes.func,
  exercises: PropTypes.array
};
Sidebar.defaultProps = {
  className: '',
  defaultTranslation: 'us',
  next: null,
  previous: null,
  current: null,
  disabled: false,
  onOpen: null,
  onLanguageClick: null,
  onClick: null,
  exercises: []
};