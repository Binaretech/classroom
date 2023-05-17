package errors

import (
	"net/http"

	"github.com/Binaretech/classroom/pkg/lang"
	"github.com/labstack/echo/v4"
)

type ServerError interface {
	error
	GetCode() uint
	GetMessage() interface{}
	GetMessageCtx(c echo.Context) interface{}
}

type Error struct {
	msg  interface{}
	code uint
}

func (err *Error) Error() string {
	return ""
}

func (err *Error) GetMessage() interface{} {
	return err.msg
}

func (err *Error) GetMessageCtx(c echo.Context) interface{} {
	return err.msg
}

func (err *Error) GetCode() uint {
	return err.code
}

func New(msg interface{}, code uint) *Error {
	return &Error{msg: msg, code: code}
}

type WrappedError struct {
	err  error
	msg  any
	code uint
}

func (err *WrappedError) Error() string {
	return err.err.Error()
}

func (err *WrappedError) GetCode() uint {
	return err.code
}

func (err *WrappedError) GetMessage() any {
	return err.msg
}

func (err *WrappedError) GetMessageCtx(c echo.Context) any {
	return err.msg
}

func WrapError(e error, message any, code uint) *WrappedError {
	return &WrappedError{err: e, code: code, msg: message}
}

type InternalError struct {
	err error
}

func NewInternalError(err error) *InternalError {
	return &InternalError{err: err}
}

func (err *InternalError) Error() string {
	return err.err.Error()
}

func (err *InternalError) GetCode() uint {
	return http.StatusInternalServerError
}

func (err *InternalError) GetMessage() interface{} {
	return lang.Trans("internal error")
}

func (err *InternalError) GetMessageCtx(c echo.Context) interface{} {
	return lang.TransCtx(c, "internal error")
}

type BadRequest struct {
	msg interface{}
	err error
}

func NewBadRequest(msg interface{}) *BadRequest {
	return &BadRequest{msg: msg}
}

func NewBadRequestWrapped(msg interface{}, err error) *BadRequest {
	return &BadRequest{msg: msg, err: err}
}

func (err *BadRequest) Error() string {
	if err.err == nil {
		return ""
	}

	return err.err.Error()
}

func (err *BadRequest) GetCode() uint {
	return http.StatusBadRequest
}

func (err *BadRequest) GetMessage() interface{} {
	return err.msg
}

func (err *BadRequest) GetMessageCtx(c echo.Context) interface{} {
	return err.msg
}

type Unauthenticated struct {
}

func NewUnauthenticated() *Unauthenticated {
	return &Unauthenticated{}
}

func (err *Unauthenticated) Error() string {
	return ""
}

func (err *Unauthenticated) GetCode() uint {
	return http.StatusUnauthorized
}

func (err *Unauthenticated) GetMessage() interface{} {
	return lang.Trans("unauthenticated")
}

func (err *Unauthenticated) GetMessageCtx(c echo.Context) interface{} {
	return lang.TransCtx(c, "unauthenticated")
}

type NotFound struct {
	msg string
}

func NewNotFound(msg string) *NotFound {
	return &NotFound{
		msg: msg,
	}
}

func (err *NotFound) Error() string {
	return ""
}

func (err *NotFound) GetCode() uint {
	return http.StatusNotFound
}

func (err *NotFound) GetMessage() interface{} {
	return err.msg
}

func (err *NotFound) GetMessageCtx(c echo.Context) interface{} {
	return err.msg
}

type Forbidden struct {
	msg string
}

func NewDefaultForbiddenCtx(c echo.Context) *Forbidden {
	return &Forbidden{
		msg: lang.TransCtx(c, "forbidden"),
	}
}

func NewDefaultForbidden() *Forbidden {
	return &Forbidden{
		msg: lang.Trans("forbidden"),
	}
}

func NewForbidden(msg string) *Forbidden {
	return &Forbidden{
		msg: msg,
	}
}

func (err *Forbidden) Error() string {
	return ""
}

func (err *Forbidden) GetCode() uint {
	return http.StatusForbidden
}

func (err *Forbidden) GetMessage() interface{} {
	return err.msg
}

func (err *Forbidden) GetMessageCtx(c echo.Context) interface{} {
	return err.msg
}

type Unimplemented struct {
}

func NewUnimplemented() *Unimplemented {
	return &Unimplemented{}
}

func (err *Unimplemented) Error() string {
	return ""
}

func (err *Unimplemented) GetCode() uint {
	return http.StatusNotImplemented
}

func (err *Unimplemented) GetMessage() interface{} {
	return "unimplemented"
}
