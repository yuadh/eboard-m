/**
  ******************************************************************************
  * @file    edp5in65.h
  * @author  Waveshare Team
  * @version V1.0.0
  * @date    27-July-2020
  * @brief   This file describes initialisation of 5.65f e-Papers
  *
  ******************************************************************************
  */

/*****************************************************************************
                      EPD_5IN65F
******************************************************************************/

static void EPD_5IN65F_BusyHigh(void)// If BUSYN=0 then waiting
{
    while(!(digitalRead(PIN_SPI_BUSY)));
}

static void EPD_5IN65F_BusyLow(void)// If BUSYN=1 then waiting
{
    while(digitalRead(PIN_SPI_BUSY));
}

static void EPD_5IN65F_Show(void)
{
    EPD_SendCommand(0x04);//0x04
    EPD_5IN65F_BusyHigh();
    EPD_SendCommand(0x12);//0x12
    EPD_5IN65F_BusyHigh();
    EPD_SendCommand(0x02);//0x02
    EPD_5IN65F_BusyLow();
	delay(200);
    Serial.print("EPD_5IN65F_Show END\r\n");

    delay(100);     
    EPD_SendCommand(0x07);//sleep
    EPD_SendData(0xA5);
    delay(100);
}

int EPD_5IN65F_init() 
{
    EPD_Reset();
    
    EPD_5IN65F_BusyHigh();
    EPD_SendCommand(0x00);
    EPD_SendData(0xEF);
    EPD_SendData(0x08);
    EPD_SendCommand(0x01);
    EPD_SendData(0x37);
    EPD_SendData(0x00);
    EPD_SendData(0x23);
    EPD_SendData(0x23);
    EPD_SendCommand(0x03);
    EPD_SendData(0x00);
    EPD_SendCommand(0x06);
    EPD_SendData(0xC7);
    EPD_SendData(0xC7);
    EPD_SendData(0x1D);
    EPD_SendCommand(0x30);
    EPD_SendData(0x3C);
    EPD_SendCommand(0x41);
    EPD_SendData(0x00);
    EPD_SendCommand(0x50);
    EPD_SendData(0x37);
    EPD_SendCommand(0x60);
    EPD_SendData(0x22);
    EPD_SendCommand(0x61);
    EPD_SendData(0x02);
    EPD_SendData(0x58);
    EPD_SendData(0x01);
    EPD_SendData(0xC0);
    EPD_SendCommand(0xE3);
    EPD_SendData(0xAA);
	
	delay(100);
    EPD_SendCommand(0x50);
    EPD_SendData(0x37);
	
	EPD_SendCommand(0x61);//Set Resolution setting
    EPD_SendData(0x02);
    EPD_SendData(0x58);
    EPD_SendData(0x01);
    EPD_SendData(0xC0);
    EPD_SendCommand(0x10);//begin write data to e-Paper
	
    return 0;
}
