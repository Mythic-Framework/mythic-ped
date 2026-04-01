fx_version "cerulean"
lua54 'yes'
game "gta5"

version '1.0.0'
repository 'https://github.com/Mythic-Framework/mythic-ped'

server_script "@oxmysql/lib/MySQL.lua"
client_script "@mythic-base/components/cl_error.lua"
client_script "@mythic-pwnzor/client/check.lua"

ui_page 'ui/dist/index.html'

files {
    'ui/dist/*.*',
}

client_scripts {
    'storeData.lua',
    'config.lua',
    'utils/*.lua',
    'client/**/*.lua'
}

server_scripts {
    'config.lua',
    'utils/*.lua',
    'server/**/*.lua',
}