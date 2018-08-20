class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePickOption = this.handlePickOption.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        };
    }

    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    }

    handlePickOption() {
        alert(this.state.options[Math.floor(Math.random() * this.state.options.length)]);
    }

    handleAddOption(option) {
        if(!option)
            return 'Enter a valid value to add item';
        else if (this.state.options.indexOf(option) > -1)
            return 'This option already exists';

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
    }

    render() {
        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer!';

        return (
            <div className="container">
                <Header title={title} subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePickOption={this.handlePickOption} />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions} />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
                <button 
                    className="btn btn-info" 
                    onClick={this.props.handlePickOption} 
                    disabled={!this.props.hasOptions}>What should I do?</button>
            </div>
        );
    }
}

class Options extends React.Component {
    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.props.handleDeleteOptions}>Remove All</button>
                {this.props.options.map((option) => <Option key={option} optionText={option} />)}
            </div>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.optionText}</p>
            </div>
        );
    }
}

class AddOption extends React.Component {
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            error: undefined
        };
    }

    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => {
            return { error };
        });
        if(!error)
            e.target.option.value = '';
    }

    render() {
        return (
            <div>
                { this.state.error &&
                    <div className="alert alert-danger">{this.state.error}</div>
                }
                <form onSubmit={this.handleAddOption}>
                    <div className="input-group">
                        <input type="text" className="form-control" name="option" autoFocus />
                        <span className="input-group-btn">
                            <button className="btn btn-success">Add option</button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));