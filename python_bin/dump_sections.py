import pefile
import sys

pe = pefile.PE(sys.argv[1])
print("name,offset")
for section in pe.sections:
    name = section.Name.rstrip(b'\x00').decode()
    offset = hex(section.VirtualAddress)
    print(f"{name},{offset}")
