from pathlib import Path
pdf = Path(r"c:/Users/darkl/Downloads/6555d51ab66cd33ba908042e.pdf")
print('exists', pdf.exists())
try:
    import pypdf
    print('pypdf ok')
    r = pypdf.PdfReader(str(pdf))
    print('pages', len(r.pages))
    text = '\n'.join((r.pages[i].extract_text() or '') for i in range(min(9, len(r.pages))))
    print(text[:12000])
except Exception as e:
    print('ERR', e)
