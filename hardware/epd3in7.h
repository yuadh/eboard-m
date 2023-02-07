/*****************************************************************************
* | File      	:   EPD_3IN7.c
* | Author      :   Waveshare team
* | Function    :   3.7inch e-paper
* | Info        :
*----------------
* |	This version:   V1.0
* | Date        :   2020-08-10
* | Info        :
* -----------------------------------------------------------------------------
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documnetation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to  whom the Software is
# furished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS OR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
******************************************************************************/

static const UBYTE lut_1Gray_GC[] =
{
0x2A,0x05,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//1
0x05,0x2A,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//2
0x2A,0x15,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//3
0x05,0x0A,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//4
0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//5
0x00,0x02,0x03,0x0A,0x00,0x02,0x06,0x0A,0x05,0x00,//6
0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//7
0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//8
0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//9
0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,//10
0x22,0x22,0x22,0x22,0x22
}; 

static void EPD_3IN7_ReadBusy_HIGH(void)
{
    Serial.print("e-Paper busy\r\n");
    UBYTE busy;
    do {
        busy = digitalRead(PIN_SPI_BUSY);
    } while(busy);
    delay(200);
    Serial.print("e-Paper busy release\r\n");
}

/******************************************************************************
function :	set the look-up tables
parameter:
******************************************************************************/
static void EPD_3IN7_Load_LUT(void)
{
  UWORD i;
  EPD_SendCommand(0x32);
  for (i = 0; i < 105; i++)
  {
	EPD_SendData(lut_1Gray_GC[i]);
  }
}

/******************************************************************************
function :  Initialize the e-Paper register
parameter:
******************************************************************************/
int EPD_3IN7_1Gray_Init()
{
    EPD_Reset();
    
    EPD_SendCommand(0x12);
    delay(300);
    
    EPD_SendCommand(0x46); 
    EPD_SendData(0xF7);
    EPD_3IN7_ReadBusy_HIGH();
    EPD_SendCommand(0x47);
    EPD_SendData(0xF7);
    EPD_3IN7_ReadBusy_HIGH(); 
    
    EPD_SendCommand(0x01); // setting gaet number
    EPD_SendData(0xDF);
    EPD_SendData(0x01);
    EPD_SendData(0x00);

    EPD_SendCommand(0x03); // set gate voltage
    EPD_SendData(0x00);

    EPD_SendCommand(0x04); // set source voltage
    EPD_SendData(0x41);
    EPD_SendData(0xA8);
    EPD_SendData(0x32);

    EPD_SendCommand(0x11); // set data entry sequence
    EPD_SendData(0x03);

    EPD_SendCommand(0x3C); // set border 
    EPD_SendData(0x00);

    EPD_SendCommand(0x0C); // set booster strength
    EPD_SendData(0xAE);
    EPD_SendData(0xC7);
    EPD_SendData(0xC3);
    EPD_SendData(0xC0);
    EPD_SendData(0xC0);  

    EPD_SendCommand(0x18); // set internal sensor on
    EPD_SendData(0x80);
     
    EPD_SendCommand(0x2C); // set vcom value
    EPD_SendData(0x44);
    
    EPD_SendCommand(0x37); // set display option, these setting turn on previous function
    EPD_SendData(0x00);     //can switch 1 gray or 4 gray
    EPD_SendData(0xFF);
    EPD_SendData(0xFF);
    EPD_SendData(0xFF);
    EPD_SendData(0xFF);  
    EPD_SendData(0x4F);
    EPD_SendData(0xFF);
    EPD_SendData(0xFF);
    EPD_SendData(0xFF);
    EPD_SendData(0xFF);  

    EPD_SendCommand(0x44); // setting X direction start/end position of RAM
    EPD_SendData(0x00);
    EPD_SendData(0x00);
    EPD_SendData(0x17);
    EPD_SendData(0x01);

    EPD_SendCommand(0x45); // setting Y direction start/end position of RAM
    EPD_SendData(0x00);
    EPD_SendData(0x00);
    EPD_SendData(0xDF);
    EPD_SendData(0x01);

    EPD_SendCommand(0x22); // Display Update Control 2
    EPD_SendData(0xCF);
	
	EPD_SendCommand(0x4E);//Set Resolution setting
	EPD_SendData(0x00);
	EPD_SendData(0x00);
	EPD_SendCommand(0x4F);
	EPD_SendData(0x00);
	EPD_SendData(0x00);

	EPD_SendCommand(0x24);//begin write data to e-Paper
	
	return 0;
}

/******************************************************************************
function :  Sends the image buffer in RAM to e-Paper and displays
parameter:
******************************************************************************/
static void EPD_3IN7_1Gray_Show(void)
{
	EPD_3IN7_Load_LUT();
	EPD_SendCommand(0x20);
	EPD_3IN7_ReadBusy_HIGH();  
	Serial.print("EPD_3IN7_Show END\r\n");
	
	EPD_SendCommand(0X50);
	EPD_SendData(0xf7);
	EPD_SendCommand(0X02);   //power off
	EPD_SendCommand(0X07);   //deep sleep
	EPD_SendData(0xA5);
}
