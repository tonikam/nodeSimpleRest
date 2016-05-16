
@echo off
if [%1]==[] goto blank

set PathCurl="C:\Program Files\curl\bin"
set Port=4000

set counter=0
:begin
%PathCurl%\curl -i -X POST --data "title=Alles Sense&author=Terry Pratchett&entry=discworld%counter%" http://localhost:%Port%/notebook
echo.
set /a counter=%counter%+1
if %counter% equ %1 goto done
goto begin

:blank
echo Please enter number of iterations
goto done

:done

