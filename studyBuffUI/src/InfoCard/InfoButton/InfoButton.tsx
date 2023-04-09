import * as React from 'react';

interface MyProps {showMe: Boolean}
interface MyState {}

class InfoButton extends React.Component <MyProps, MyState>{
  constructor(props: any){
    super(props);
    this.state = {};
  }

  render() {
    return this.props.showMe && (
      <div className="container">
        <button type="submit" className="btn nav-btn-red">
          SIGN UP
        </button>
      </div>
    );
  }
}

export default InfoButton;