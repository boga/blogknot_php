var Tag = React.createClass({
    render: function () {
        return (
            <li className="list-group-item">
                <a href={'#/tag/' + this.props.id} class="btn btn-default" role="button">
                    {this.props.title}
                </a>
            </li>
        );
    }
});

var TagList = React.createClass({

    loadFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadFromServer();
        setInterval(this.loadFromServer, this.props.pollInterval);
    },

    render: function () {
        var tagNodes = this.state.data.map(function (tag) {
            return (
                <Tag id={tag.id} title={tag.title}>
                </Tag>
            );
        });
        return (
            <div className="tagList">
                <ul class="list-group">
                    {tagNodes}
                </ul>
            </div>
        );
    }
});