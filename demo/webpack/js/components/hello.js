var React = require('react');

class HelloComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wording: '你好呀, '};
    }
    render() {
        return <div>{this.state.wording} {this.props.name}</div>;
    }
}

module.exports = HelloComponent;
