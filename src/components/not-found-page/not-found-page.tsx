import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const/const';

function NotFoundPage () {
  return (
    <div style={
      {
        display: 'block',
        width: '600px',
        height:'200px',
        margin: 'auto',
        marginTop: '200px',
        textAlign: 'center',
        fontSize: '20px',
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '30px',
        backgroundColor: 'palegoldenrod',
      }
    }
    >
      <p style={{fontSize: '60px'}}>
        404 Page Not Found
      </p>
      <Link className={'button--black-border'} style={{ border: 'none', backgroundColor: 'transparent'}} to={AppRoute.Root}>
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundPage;
