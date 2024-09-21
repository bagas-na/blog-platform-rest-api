import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import * as path from 'path';

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) {
  // defining error
  let errMsg: string = "";
  if (err === undefined || err === null) {
    errMsg = "An unknown error occurred";
  } else if (typeof err === 'string') {
    errMsg = err
  } else if (typeof err === 'object' && 'message' in err) {
    errMsg = err.message ? String(err.message) : "An unknown error occurred";
  }

  // set locals, only providing error in development
  res.locals.message = errMsg;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let errStatus: number = 500;
  if (err === undefined || err === null) {
    errStatus = 500;
  } else if (typeof err === 'object' && 'status' in err) {
    errStatus = Number(err.status);
  }

  // render the error page
  res.status(errStatus || 500);
  res.render('error');
});

export default app;