import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



export default function CardCover({children}) {

  return (
    <Card >
      <CardContent >
        {children}
      </CardContent>
   
    </Card>
  );
}
