import React from 'react';
import SearchBox from './SearchBox';

export default React.createClass({
    render: function(){
        return (
            <div className="header">
                <div style={{lineHeight: '75px'}} className="content header__content">
                    <div className="header__logo"></div>
                    <SearchBox className="header__search" />
                    <div className="header__left">
                        <div className="header__add"></div>
                    </div>
                </div>
            </div>
        );
    }
});
