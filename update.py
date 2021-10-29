import os
head = """<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>p5.js Codes</title>
    </head>


    <body>
        <div style="font-size:large; margin: 1em;">
            Illustrations made with p5.js library.
        </div>
        <div>
        <ul>"""

def addItem():
    res = ""
    dirs = os.listdir()
    item_names = []
    for lst_item in dirs:
        if os.path.isdir(os.path.join(os.path.abspath("."), lst_item)) and lst_item[0] != '.' and lst_item != "temp":
            item_names.append(lst_item)
    for item_name in item_names:
        item = """
                <li>
                    <a href="./{}/index.html">
                        {}
                    </a>
                </li>
                """.format(item_name.replace(" ", "%20"), item_name)
        res += item
    return res

tail = """
        </ul>
        </div>
    
    </body>
</html>
"""

print(head+addItem()+tail)