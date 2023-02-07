/**
  ******************************************************************************
  * @file    edp7in5_HD.h
  * @author  Waveshare Team
  * @version V1.0.0
  * @date    23-January-2018
  * @brief   This file describes initialisation of 7.5 HD and 7.5b HD e-Papers
  *
  ******************************************************************************
  */


void EPD_7IN5_HD_Readbusy(void)
{
    Serial.print("\r\ne-Paper busy\r\n");
    delay(200);
    unsigned char busy;
    do{
        busy = digitalRead(PIN_SPI_BUSY);     
    }while(busy);
    delay(200);
    Serial.print("e-Paper busy release\r\n");
}


/*****************************************************************************
                      EPD_7IN5_HD
******************************************************************************/

static void EPD_7IN5_HD_Show(void)
{   
	unsigned int i;
	EPD_SendCommand(0x26);
    for(i=0; i<880*528/8; i++)	{
        EPD_SendData(0xff);
    }
    EPD_SendCommand(0x22);//show
    EPD_SendData(0xF7);
    EPD_SendCommand(0x20);
    delay(200);
    EPD_7IN5_HD_Readbusy();
	
	EPD_SendCommand(0x10);//sleep
	EPD_SendData(0x01);
	
    Serial.print("EPD_7IN5_HD_Show END\r\n");
}

int EPD_7IN5_HD_init() 
{
    EPD_Reset();
    
    EPD_SendCommand(0x12);  //SWRESET
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x46);  // Auto Write RAM
    EPD_SendData(0xF7);
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x47);  // Auto Write RAM
    EPD_SendData(0xF7);
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x0C);  // Soft start setting
    EPD_SendData(0xAE);
	EPD_SendData(0xC7);
    EPD_SendData(0xC3);
    EPD_SendData(0xC0);
    EPD_SendData(0x40);   

    EPD_SendCommand(0x01);  // Set MUX as 527
    EPD_SendData(0xAF);
    EPD_SendData(0x02);
    EPD_SendData(0x01);

    EPD_SendCommand(0x11);  // Data entry mode
    EPD_SendData(0x01);

    EPD_SendCommand(0x44);
    EPD_SendData(0x00); // RAM x address start at 0
    EPD_SendData(0x00);
    EPD_SendData(0x6F); // RAM x address end at 36Fh -> 879
    EPD_SendData(0x03);
    EPD_SendCommand(0x45);
    EPD_SendData(0xAF); // RAM y address start at 20Fh;
    EPD_SendData(0x02);
    EPD_SendData(0x00); // RAM y address end at 00h;
    EPD_SendData(0x00);

    EPD_SendCommand(0x3C); // VBD
    EPD_SendData(0x01); // LUT1, for white

    EPD_SendCommand(0x18);
    EPD_SendData(0X80);
    EPD_SendCommand(0x22);
    EPD_SendData(0XB1);	//Load Temperature and waveform setting.
    EPD_SendCommand(0x20);
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x4E); 
    EPD_SendData(0x00);
    EPD_SendData(0x00);
    EPD_SendCommand(0x4F); 
    EPD_SendData(0x00);
    EPD_SendData(0x00);
    
    EPD_SendCommand(0x4F); 
    EPD_SendData(0x00);
    EPD_SendData(0x00);
    EPD_SendCommand(0x24);//BLOCK
    return 0;
}

/*****************************************************************************
                      EPD_7IN5B_HD
******************************************************************************/


static void EPD_7IN5B_HD_Show(void)
{
    EPD_SendCommand(0x22);//show
    EPD_SendData(0xC7);
    EPD_SendCommand(0x20);
    delay(200);
    EPD_7IN5_HD_Readbusy();
	
	EPD_SendCommand(0x10);//sleep
	EPD_SendData(0x01);
	
    Serial.print("EPD_7IN5B_HD_Show END\r\n");
}

int EPD_7IN5B_HD_init() 
{
    EPD_Reset();
    
    EPD_SendCommand(0x12);  //SWRESET
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x46);  // Auto Write RAM
    EPD_SendData(0xF7);
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x47);  // Auto Write RAM
    EPD_SendData(0xF7);
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x0C);  // Soft start setting
    EPD_SendData(0xAE);
	EPD_SendData(0xC7);
    EPD_SendData(0xC3);
    EPD_SendData(0xC0);
    EPD_SendData(0x40);   

    EPD_SendCommand(0x01);  // Set MUX as 527
    EPD_SendData(0xAF);
    EPD_SendData(0x02);
    EPD_SendData(0x01);

    EPD_SendCommand(0x11);  // Data entry mode
    EPD_SendData(0x01);

    EPD_SendCommand(0x44);
    EPD_SendData(0x00); // RAM x address start at 0
    EPD_SendData(0x00);
    EPD_SendData(0x6F); // RAM x address end at 36Fh -> 879
    EPD_SendData(0x03);
    EPD_SendCommand(0x45);
    EPD_SendData(0xAF); // RAM y address start at 20Fh;
    EPD_SendData(0x02);
    EPD_SendData(0x00); // RAM y address end at 00h;
    EPD_SendData(0x00);

    EPD_SendCommand(0x3C); // VBD
    EPD_SendData(0x01); // LUT1, for white

    EPD_SendCommand(0x18);
    EPD_SendData(0X80);
    EPD_SendCommand(0x22);
    EPD_SendData(0XB1);	//Load Temperature and waveform setting.
    EPD_SendCommand(0x20);
    EPD_7IN5_HD_Readbusy();        //waiting for the electronic paper IC to release the idle signal

    EPD_SendCommand(0x4E); 
    EPD_SendData(0x00);
    EPD_SendData(0x00);
    EPD_SendCommand(0x4F); 
    EPD_SendData(0xAF);
    EPD_SendData(0x02);
    
    EPD_SendCommand(0x4F); 
    EPD_SendData(0xAf);
    EPD_SendData(0x02);
    EPD_SendCommand(0x24);//BLOCK
    return 0;
}
