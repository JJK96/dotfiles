#!/usr/bin/env python
import json
import sys
output = json.load(sys.stdin)

class Output:
    _fields = False
    def __init__(self, str):
        self.first_line, _, self.output = str.partition('\n')
        
    @property
    def fields(self):
        if not self._fields:
            _, _, fields = self.first_line.partition(' ')
            fields_dict = {}
            for field in fields.split(';'):
                key,_,value = field.partition(':')
                fields_dict[key.strip()] = value.strip()
            self._fields = fields_dict
        return self._fields

    def __str__(self):
        res = []
        res.append(f"> {self.fields['taskRequest']} {self.fields['taskRequestparameters']}")
        res.append(self.fields['taskResponse'])
        res.append(self.output)
        return '\n'.join(res)

output = Output(output['_source']['c2']['message'])
print(output)
