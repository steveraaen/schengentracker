var countries = [{name: "Afghanistan", schengen: false, europe: false},
{name: "Albania", schengen: false, europe: true, colors: ['black', 'red']},
{name: "Algeria", schengen: false, europe: false},
{name: "Andorra", schengen: true, europe: true},
{name: "Angola", schengen: false, europe: false},
{name: "Anguilla", schengen: false, europe: false},
{name: "Antigua & Barbuda", schengen: false, europe: false},
{name: "Argentina", schengen: false, europe: false},
{name: "Armenia", schengen: false, europe: true, colors:['gold', 'red', 'blue']},
{name: "Australia", schengen: false, europe: false},
{name: "Austria", schengen: true, europe: true},
{name: "Azerbaijan", schengen: false, europe: false},
{name: "Bahamas", schengen: false, europe: false},
{name: "Bahrain", schengen: false, europe: false},
{name: "Bangladesh", schengen: false, europe: false},
{name: "Barbados", schengen: false, europe: false},
{name: "Belarus", schengen: false, europe: true},
{name: "Belgium", schengen: true, europe: true, colors: ['gold', 'red', 'black']},
{name: "Belize", schengen: false, europe: false},
{name: "Benin", schengen: false, europe: false},
{name: "Bermuda", schengen: false, europe: false},
{name: "Bhutan", schengen: false, europe: false},
{name: "Bolivia", schengen: false, europe: false},
{name: "Bosnia & Herzegovina", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{name: "Botswana", schengen: false, europe: false},
{name: "Brazil", schengen: false, europe: false, colors:['green', 'yellow']},
{name: "Brunei Darussalam", schengen: false, europe: false},
{name: "Bulgaria", schengen: false, europe: true},
{name: "Burkina Faso", schengen: false, europe: false},
{name: "Myanmar/Burma", schengen: false, europe: false},
{name: "Burundi", schengen: false, europe: false},
{name: "Cambodia", schengen: false, europe: false},
{name: "Cameroon", schengen: false, europe: false},
{name: "Canada", schengen: false, europe: false, colors: ['white', 'red']},
{name: "Cape Verde", schengen: false, europe: false},
{name: "Cayman Islands", schengen: false, europe: false},
{name: "Central African Republic", schengen: false, europe: false},
{name: "Chad", schengen: false, europe: false},
{name: "Chile", schengen: false, europe: false},
{name: "China", schengen: false, europe: false, colors: ['gold', 'red']},
{name: "Colombia", schengen: false, europe: false},
{name: "Comoros", schengen: false, europe: false},
{name: "Congo", schengen: false, europe: false},
{name: "Costa Rica", schengen: false, europe: false},
{name: "Croatia", schengen: false, europe: true, colors: ['red', 'white', 'blue']},
{name: "Cuba", schengen: false, europe: false},
{name: "Cyprus", schengen: false, europe: true},
{name: "Czech Republic", schengen: true, europe: true, colors:['gold', 'red']},
{name: "The Congo", schengen: false, europe: false},
{name: "Denmark", schengen: true, europe: true, colors:['red', 'white']},
{name: "Djibouti", schengen: false, europe: false},
{name: "Dominica", schengen: false, europe: false},
{name: "Dominican Republic", schengen: false, europe: false},
{name: "Ecuador", schengen: false, europe: false},
{name: "Egypt", schengen: false, europe: false, colors: ['red', 'white', 'black']},
{name: "El Salvador", schengen: false, europe: false},
{name: "Equatorial Guinea", schengen: false, europe: false},
{name: "Eritrea", schengen: false, europe: false},
{name: "Estonia", schengen: true, europe: true, colors: ['white', 'black', 'blue']},
{name: "Ethiopia", schengen: false, europe: false},
{name: "Fiji", schengen: false, europe: false},
{name: "Finland", schengen: true, europe: true, colors: ['blue', 'white']},
{name: "France", schengen: true, europe: true, colors: ['red', 'white', 'blue']},
{name: "French Guiana", schengen: false, europe: false},
{name: "Gabon", schengen: false, europe: false},
{name: "Gambia", schengen: false, europe: false},
{name: "Georgia", schengen: false, europe: true, colors:['white', 'red']},
{name: "Germany", schengen: true, europe: true, colors: ['gold', 'black', 'red']},
{name: "Ghana", schengen: false, europe: false},
{name: "Great Britain", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{name: "Greece", schengen: true, europe: true, colors:['white', 'blue']},
{name: "Grenada", schengen: false, europe: false},
{name: "Guadeloupe", schengen: false, europe: false},
{name: "Guatemala", schengen: false, europe: false},
{name: "Guinea", schengen: false, europe: false},
{name: "Guinea-Bissau", schengen: false, europe: false},
{name: "Guyana", schengen: false, europe: false},
{name: "Haiti", schengen: false, europe: false},
{name: "Honduras", schengen: false, europe: false},
{name: "Hungary", schengen: true, europe: true, colors:['white', 'red', 'green']},
{name: "Iceland", schengen: true, europe: true, colors:['blue', 'red', 'white']},
{name: "India", schengen: false, europe: false, colors:['green', 'white', 'gold']},
{name: "Indonesia", schengen: false, europe: false},
{name: "Iran", schengen: false, europe: false},
{name: "Iraq", schengen: false, europe: false, colors:['gold', 'green']},
{name: "Ireland", schengen: false, europe: true, colors: ['green', 'gold', 'white']},
{name: "Israel and the Occupied Territories", schengen: false, europe: false, colors: ['blue', 'white']},
{name: "Italy", schengen: true, europe: true, colors:['white', 'red', 'green']},
{name: "Ivory Coast (Cote d'Ivoire)", schengen: false, europe: false},
{name: "Jamaica", schengen: false, europe: false, colors: ['gold','black','green']},
{name: "Japan", schengen: false, europe: false, colors: ['red', 'white']},
{name: "Jordan", schengen: false, europe: false},
{name: "Kazakhstan", schengen: false, europe: false},
{name: "Kenya", schengen: false, europe: false},
{name: "Kosovo", schengen: false, europe: true},
{name: "Kuwait", schengen: false, europe: false},
{name: "Kyrgyz Republic (Kyrgyzstan)", schengen: false, europe: false},
{name: "Laos", schengen: false, europe: false},
{name: "Latvia", schengen: true, europe: true, colors: ['white', 'purple']},
{name: "Lebanon", schengen: false, europe: false, colors: ['red','white','green']},
{name: "Lesotho", schengen: false, europe: false},
{name: "Liberia", schengen: false, europe: false},
{name: "Libya", schengen: false, europe: false},
{name: "Liechtenstein", schengen: true, europe: true},
{name: "Lithuania", schengen: true, europe: true, colors: ['gold', 'red', 'green']},
{name: "Luxembourg", schengen: true, europe: true, colors: ['red', 'white', 'lightblue']},
{name: "Macedonia", schengen: false, europe: true, colors: ['red', 'gold']},
{name: "Madagascar", schengen: false, europe: false},
{name: "Malawi", schengen: false, europe: false},
{name: "Malaysia", schengen: false, europe: false},
{name: "Maldives", schengen: false, europe: false},
{name: "Mali", schengen: false, europe: false},
{name: "Malta", schengen: true, europe: true, colors: ['red', 'white']},
{name: "Martinique", schengen: false, europe: false},
{name: "Mauritania", schengen: false, europe: false},
{name: "Mauritius", schengen: false, europe: false},
{name: "Mayotte", schengen: false, europe: false},
{name: "Mexico", schengen: false, europe: false, colors: ['red', 'white', 'green']},
{name: "Moldova, Republic of", schengen: false, europe: true},
{name: "Monaco", schengen: false, europe: true, colors: ['red', 'white']},
{name: "Mongolia", schengen: false, europe: false},
{name: "Montenegro", schengen: false, europe: true},
{name: "Montserrat", schengen: false, europe: false},
{name: "Morocco", schengen: false, europe: false},
{name: "Mozambique", schengen: false, europe: false},
{name: "Namibia", schengen: false, europe: false},
{name: "Nepal", schengen: false, europe: false, colors: ['red','white', 'blue']},
{name: "Netherlands", schengen: true, europe: true, colors:['orange', 'white', 'blue']},
{name: "New Zealand", schengen: false, europe: false},
{name: "Nicaragua", schengen: false, europe: false},
{name: "Niger", schengen: false, europe: false},
{name: "Nigeria", schengen: false, europe: false},
{name: "North Korea", schengen: false, europe: false},
{name: "Norway", schengen: true, europe: true, colors:['white', 'red', 'blue']},
{name: "Oman", schengen: false, europe: false},
{name: "Pacific Islands", schengen: false, europe: false},
{name: "Pakistan", schengen: false, europe: false},
{name: "Panama", schengen: false, europe: false},
{name: "Papua New Guinea", schengen: false, europe: false},
{name: "Paraguay", schengen: false, europe: false},
{name: "Peru", schengen: false, europe: false},
{name: "Philippines", schengen: false, europe: false},
{name: "Poland", schengen: true, europe: true, colors:['white', 'red']},
{name: "Portugal", schengen: true, europe: true, colors: ['red', 'green']},
{name: "Puerto Rico", schengen: false, europe: false},
{name: "Qatar", schengen: false, europe: false},
{name: "Reunion", schengen: false, europe: false},
{name: "Romania", schengen: false, europe: true, colors:['gold', 'white', 'blue']},
{name: "Russian Federation", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{name: "Rwanda", schengen: false, europe: false},
{name: "Saint Kitts &Nevis", schengen: false, europe: false},
{name: "Saint Lucia", schengen: false, europe: false},
{name: "Saint Vincent's & Grenadines", schengen: false, europe: false},
{name: "Samoa", schengen: false, europe: false},
{name: "Sao Tome & Principe", schengen: false, europe: false},
{name: "Saudi Arabia", schengen: false, europe: false, colors: ['green', 'white']},
{name: "Senegal", schengen: false, europe: false},
{name: "Serbia", schengen: false, europe: true, colors:['white', 'red', 'blue']},
{name: "Seychelles", schengen: false, europe: false},
{name: "Sierra Leone", schengen: false, europe: false},
{name: "Singapore", schengen: false, europe: false},
{name: "Slovakia", schengen: true, europe: true, colors:['red', 'blue','white' ]},
{name: "Slovenia", schengen: true, europe: true, colors:['white', 'red', 'blue']},
{name: "Solomon Islands", schengen: false, europe: false, colors:['blue', 'red', 'white']},
{name: "Somalia", schengen: false, europe: false},
{name: "South Africa", schengen: false, europe: false, colors:['gold', 'green', 'black']},
{name: "Korea, South Korea", schengen: false, europe: false, colors:['blue', 'red', 'black']},
{name: "South Sudan", schengen: false, europe: false},
{name: "Spain", schengen: true, europe: true, colors:['red', 'gold']},
{name: "Sri Lanka", schengen: false, europe: false},
{name: "Sudan", schengen: false, europe: false},
{name: "Suriname", schengen: false, europe: false},
{name: "Swaziland", schengen: false, europe: false},
{name: "Sweden", schengen: true, europe: true, colors: ['gold', 'blue']},
{name: "Switzerland", schengen: true, europe: true, colors: ['red', 'white']},
{name: "Syria", schengen: false, europe: false},
{name: "Tajikistan", schengen: false, europe: false},
{name: "Tanzania", schengen: false, europe: false},
{name: "Thailand", schengen: false, europe: false},
{name: "Timor Leste", schengen: false, europe: false},
{name: "Togo", schengen: false, europe: false},
{name: "Trinidad & Tobago", schengen: false, europe: false},
{name: "Tunisia", schengen: false, europe: false},
{name: "Turkey", schengen: false, europe: true, colors: ['red', 'white']},
{name: "Turkmenistan", schengen: false, europe: false},
{name: "Turks & Caicos Islands", schengen: false, europe: false},
{name: "Uganda", schengen: false, europe: false},
{name: "Ukraine", schengen: false, europe: true},
{name: "United Arab Emirates", schengen: false, europe: false},
{name: "United States", schengen: false, europe: false, colors: ['red', 'white', 'blue']},
{name: "Uruguay", schengen: false, europe: false},
{name: "Uzbekistan", schengen: false, europe: false},
{name: "Venezuela", schengen: false, europe: false},
{name: "Vietnam", schengen: false, europe: false},
{name: "UK Virgin Islands", schengen: false, europe: false},
{name: "US Virgin Islands", schengen: false, europe: false},
{name: "Yemen", schengen: false, europe: false},
{name: "Zambia", schengen: false, europe: false},
{name: "Zimbabwe", schengen: false, europe: false}
]
module.exports = countries