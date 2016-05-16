
@echo off
if [%1]==[] goto blank

set PathCurl="C:\Program Files\curl\bin"
set Port=4000

%PathCurl%\curl -i -X POST --data "title=Alles Sense&author=Terry Pratchett&entry=discworld%1" http://localhost:%Port%/notebook
echo.
goto done

:blank
echo Please enter one parameter
goto done

:done

