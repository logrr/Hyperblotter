var React = require('react');

var TopBar = React.createClass({
	getInitialState: function() {
		return {
		};
	},
	closeApp: function(){
		fin.desktop.main(function(){
			// Bug on close when window containing an iframe.
		  	fin.desktop.Window.getCurrent().hide();
		});
	},
	componentDidMount: function() {
        if (!fin.desktop) {
            return;
        }
        fin.desktop.main(function() {
            try {
                fin.desktop.Window.getCurrent().defineDraggableArea(document.querySelector('.top-bar'));
            } catch (e) { }
        });
    },   
	render: function () {
		return <div className="top-bar">
			<span className="title">Login with Logrr</span>
			<i onClick={this.closeApp} className="fa fa-times"></i>
		</div>
	}
});
module.exports = TopBar;

var LogrrLogin = React.createClass({
	getLogrrAppRedirectUrl: function(){
		return "http://localhost:5001/samlRedirect";
    	//return "https://localhost:44300/login/c6202e31c6634bddadef5b96fa13ed46";
    },
  	render: function() {
    	return <div>
	    	<div className="app">
	    		<TopBar />
	    		<iframe id="logrriframe" src={this.getLogrrAppRedirectUrl()}></iframe>
	    	</div>
	  	</div>;
  	}
});

module.exports = LogrrLogin;